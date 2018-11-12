# Pluralsight's Unit Testing in Angular Course
This course is up to date.

To get started, clone the repo or download it

npm install
npm test

# NOTES FORM THE COURSE

### Flow
Unit Test => Component => Mock Component service

### Types of mocks
- dummies
- stubs
- spies
- true mocks

### Init Test Example

beforeEach()
- runs before any test
- reset to initial stete before future test
- common setup

it()
- keeps critical setup
- Includes AAA

```js
describe('my first test', () => {
    let sut;

    beforeEach(() => {
        sut = {};
    });

    it('should be true if true', () => {

        // Arrange - arragne all necessary preconditions as inputs, test setup
        sut.a = false;  // init state

        // Act - act on the object or class under test
        sut.a = true;

        // Assert - check if expectations are met
        expect(sut.a).toBe(true);

    });

});

```

### Shallow Integration Tests
