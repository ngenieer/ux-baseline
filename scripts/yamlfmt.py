#!/usr/bin/env python3
"""YAML 파일을 읽어 여러 줄 문자열은 블록(|)으로 다시 쓴다. 사용: python scripts/yamlfmt.py <파일>..."""
import sys
from pathlib import Path

import yaml


class Dumper(yaml.SafeDumper):
    pass


def _str(dumper, data):
    if "\n" in data:
        data = "\n".join(line.rstrip() for line in data.split("\n"))
        return dumper.represent_scalar("tag:yaml.org,2002:str", data, style="|")
    return dumper.represent_scalar("tag:yaml.org,2002:str", data)


Dumper.add_representer(str, _str)


def dump(data) -> str:
    return yaml.dump(data, Dumper=Dumper, allow_unicode=True, sort_keys=False, width=110)


if __name__ == "__main__":
    for f in sys.argv[1:]:
        p = Path(f)
        p.write_text(dump(yaml.safe_load(p.read_text(encoding="utf-8"))), encoding="utf-8")
