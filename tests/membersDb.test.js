const testEnv = require('../tests/test-enviroment')
const db = require('../tests/data/membersDb')

let testDb = null

beforeEach(() => {
  testDb = testEnv.getTestDb()
  return testEnv.intialise(testDB)
})

afterEach(() => testEnv.cleanup(tesDb))

test('get all the letters', () => {
  const expected = 26

  return db.getMembers(testDb)

  .then(categories => {
    const actual = members.length
    expect(actual).toBe(expected)
  })
//.catch(err => expect(err).tobeNull())


})
