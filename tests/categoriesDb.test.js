const testEnv = require('../tests/test-enviroment')
const db = require('../tests/data/categoriesDb')

let testDb = null

beforeEach(() => {
  testDb = testEnv.getTestDb()
  return testEnv.intialise(testDB)
})

afterEach(() => testEnv.cleanup(tesDb))

test('get category ids', () => {
  const expected = 10

  return db.getCategories(testDb)

  .then(categories => {
    const actual = categories.length
    expect(actual).toBe(expected)
  })
//.catch(err => expect(err).tobeNull())


})
