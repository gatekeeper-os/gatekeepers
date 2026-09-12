"""Compare the complete skill tree with a fresh checkout of core main."""
from pathlib import Path
import hashlib
import sys

def files(root):
    result = {}
    for path in sorted(root.rglob('*')):
        if path.is_symlink():
            raise SystemExit('Skill tree contains a symlink')
        if path.is_file():
            result[path.relative_to(root).as_posix()] = hashlib.sha256(path.read_bytes()).hexdigest()
    if not result:
        raise SystemExit('Skill tree missing or empty')
    return result

root = Path(__file__).resolve().parents[1]
core = Path(sys.argv[1]) if len(sys.argv) == 2 else root / '.core-skill'
if files(root / '.agents/skills/write-gatekeeper') != files(core / '.agents/skills/write-gatekeeper'):
    raise SystemExit('Skill differs from current core main; copy the complete reviewed core skill tree')
print('Live core-main skill parity verified')
