TESTS = $(shell find test -name "*_spec.js")
REPORTER = spec

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require should \
		--reporter $(REPORTER) \
		--timeout 1000 \
		--growl \
		$(TESTS)


.PHONY: test