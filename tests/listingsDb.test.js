const testEnv = require('../tests/test-enviroment')
const db = require('../tests/data/listngsDb')

let testDb = null

beforeEach(() => {
  testDb = testEnv.getTestDb()
  return testEnv.intialise(testDB)
})

afterEach(() => testEnv.cleanup(tesDb))

test('get all the letters', () => {
  const expected = 26

  return db.getListings(testDb)

  .then(categories => {
    const actual = categories.length
    expect(actual).toBe(expected)
  })
//.catch(err => expect(err).tobeNull())


})
