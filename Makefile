.PHONY: help install format lint check fix clean

help:
	@echo "Available commands:"
	@echo "  make install    - Install development dependencies"
	@echo "  make format     - Format code with Prettier"
	@echo "  make lint       - Lint code with ESLint and Stylelint"
	@echo "  make check      - Run format check and lint"
	@echo "  make fix        - Auto-fix linting issues"
	@echo "  make clean      - Remove node_modules and lock files"

install:
	npm install

format:
	npm run format

lint:
	npm run lint

check: format lint

fix:
	npm run lint:fix
	npm run format

clean:
	rm -rf node_modules package-lock.json

