"""Exercise anonymous probe and fatal fetch/parity outcomes with isolated stubs."""
import os
from pathlib import Path
import subprocess
import tempfile
import unittest

SCRIPT = Path(__file__).with_name('live-core-sync.sh').resolve()


class LiveSyncTests(unittest.TestCase):
    def run_sync(self, mode, status='200', curl_exit=0, git_exit=0, parity_exit=0):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            for name, body in {
                'curl': f"printf '{status}'; exit {curl_exit}",
                'git': f'exit {git_exit}',
                'python3': f'exit {parity_exit}',
            }.items():
                stub = root / name
                stub.write_text('#!/bin/sh\n' + body + '\n')
                stub.chmod(0o755)
            output, summary = root / 'output', root / 'summary'
            env = {**os.environ, 'PATH': tmp + os.pathsep + os.environ['PATH'],
                   'GITHUB_OUTPUT': str(output), 'GITHUB_STEP_SUMMARY': str(summary)}
            result = subprocess.run(['bash', str(SCRIPT), mode], cwd=tmp, env=env,
                                    capture_output=True, text=True)
            return result, output.read_text() if output.exists() else '', summary.read_text() if summary.exists() else ''

    def test_private_or_missing_core_is_fatal(self):
        result, output, summary = self.run_sync('probe', status='404')
        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(output + summary, '')
        self.assertIn('HTTP 404', result.stderr)
        self.assertNotIn('skipped', result.stdout)
        self.assertNotIn('verified', result.stdout)

    def test_public_requires_live_step(self):
        result, output, summary = self.run_sync('probe')
        self.assertEqual(result.returncode, 0)
        self.assertEqual(output, '')
        self.assertEqual(summary, '')

    def test_probe_errors_are_fatal(self):
        for status, code in [('403', 0), ('500', 0), ('000', 7)]:
            with self.subTest(status=status):
                result, output, summary = self.run_sync('probe', status=status, curl_exit=code)
                self.assertNotEqual(result.returncode, 0)
                self.assertEqual(output + summary, '')

    def test_fetch_and_parity_errors_are_fatal(self):
        for git_exit, parity_exit in [(1, 0), (0, 1)]:
            with self.subTest(git_exit=git_exit):
                result, _, summary = self.run_sync('fetch', git_exit=git_exit, parity_exit=parity_exit)
                self.assertNotEqual(result.returncode, 0)
                self.assertEqual(summary, '')

    def test_success_recorded_only_after_fetch_and_parity(self):
        result, _, summary = self.run_sync('fetch')
        self.assertEqual(result.returncode, 0)
        self.assertEqual(summary, 'Live core-main skill parity verified\n')

    def test_workflow_does_not_conditionally_skip_live_fetch(self):
        workflow = SCRIPT.with_name('workflows').joinpath('skill-sync.yml').read_text()
        live_step = workflow.split('- name: Live core-main fetch and parity (required)', 1)[1].split('- uses:', 1)[0]
        self.assertIn('run: bash .github/live-core-sync.sh fetch', live_step)
        self.assertNotIn('if:', live_step)


if __name__ == '__main__':
    unittest.main()
