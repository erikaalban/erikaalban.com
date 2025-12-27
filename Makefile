.PHONY: help install format lint check test clean

help:
	@echo "Available commands:"
	@echo "  make install    - Install development dependencies"
	@echo "  make format     - Format code with black"
	@echo "  make lint       - Lint code with ruff"
	@echo "  make check      - Run format check and lint"
	@echo "  make fix        - Auto-fix linting issues"
	@echo "  make clean      - Remove Python cache files"

install:
	python3 -m venv .venv
	.venv/bin/pip install --upgrade pip
	.venv/bin/pip install -e ".[dev]"

format:
	.venv/bin/black .

lint:
	.venv/bin/ruff check .

check: format lint

fix:
	.venv/bin/ruff check --fix .
	.venv/bin/black .

clean:
	find . -type d -name "__pycache__" -exec rm -r {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete
	find . -type f -name "*.pyo" -delete
	find . -type f -name "*.pyd" -delete
	find . -type d -name "*.egg-info" -exec rm -r {} + 2>/dev/null || true

