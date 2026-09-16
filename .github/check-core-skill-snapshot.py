"""Verify the reviewed Tier 0 snapshot, without claiming live core access."""
from pathlib import Path
import hashlib
import json

root = Path(__file__).resolve().parents[1]
lock = json.loads((root / '.github/core-skill-lock.json').read_text())
skill = root / '.agents/skills/write-gatekeeper'
files = {}
for path in sorted(skill.rglob('*')):
    if path.is_symlink():
        raise SystemExit('Skill snapshot must not contain symlinks')
    if path.is_file():
        files[path.relative_to(skill).as_posix()] = hashlib.sha256(path.read_bytes()).hexdigest()
if not files or files != lock['files']:
    raise SystemExit('Skill differs from reviewed core snapshot; refresh with core byte-parity review')
print(f"Pinned core skill snapshot verified: {len(files)} files; not a live core-main check")
