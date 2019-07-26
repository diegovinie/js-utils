import fs from 'fs'
import {exec} from 'child_process'

const writeFile = path => content => fs.writeSync('utf8', path, content)

const readLog = options => new Promise((resolve, reject) => {
  const cmd = "git log --pretty='%cn|*|%cd|*|%s'"
  exec(cmd, (err, stdout, stderr) => {
    if (err) return reject(err)

    return resolve(stdout)
  })
})

const mapCommit = content => {
  const [user, date, title] = content.split('|*|')
  return {user, date, title}
}

const logToHash = content => content.split('\n').map(mapCommit)

const byDateRange = ([min, max]) => commit => {
  const date = new Date(commit.date)

  const minDate = new Date('2019-04-01 GMT-0500')
  const maxDate = new Date('2019-04-30 GMT-0500')

  return date >= minDate && date <= maxDate
}

async function main () {
  console.log('s1')
  const content = await readLog()
  console.log('s2')
  const commits = logToHash(content).filter(byDateRange([1,2]))

  console.log(commits)
}

main()
