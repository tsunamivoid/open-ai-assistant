import mockResponses from "../data/mockResponses.json" with { type: 'json' };

const getMockResponse = (code) => {
  let issueType = 'default'

  // Очень не очень, я понимаю, я хотел бы свич юзать, но тяжело с инклюдами его подтянуть
  if (code.includes('for')) {
    issueType = 'forLoop'
  } else if (code.includes('function') && !code.includes('return')) {
    issueType = 'missingReturn'
  } else if (code.includes('var')) {
    issueType = 'varUsage'
  } else if (code.includes('console.log')) {
    issueType = 'consoleLog'
  } else if (code.match(/=\s*\d+.*=\s*["']/)) {
    issueType = 'typeChange'
  } else if (code.split('\n').length > 20) {
    issueType = 'longFunction'
  } else if (code.includes('let') && !code.includes('=')) {
    issueType = 'unusedVariable'
  } else if (!code.includes('//')) {
    issueType = 'noComments'
  } else if (code.includes('==')) {
    issueType = 'looseEquality'
    // eslint-disable-next-line no-dupe-else-if
  } else if (code.includes('.length') && code.includes('for')) {
    issueType = 'arrayLoop'
  } else if (code.includes('function') && !code.includes('@param')) {
    issueType = 'noJSDoc'
  } else if (code.match(/if.*if/)) {
    issueType = 'nestedIf'
  } else if (code.includes('if') && !code.includes('else')) {
    issueType = 'ifWithoutElse'
  } else if (code.split('\n').some(line => line.length > 80)) {
    issueType = 'longLine'
  } else if (code.includes('globalVar')) {
    issueType = 'globalVariable'
  } else if (code.includes('/')) {
    issueType = 'division'
  } else if (code.match(/(.+).*\1/)) {
    issueType = 'duplication'
  } else if (!code.includes('try')) {
    issueType = 'noTryCatch'
  } else if (code.includes('setTimeout')) {
    issueType = 'outdatedMethod'
  }

  const responseMap = {
    forLoop: mockResponses[0],
    missingReturn: mockResponses[1],
    varUsage: mockResponses[2],
    consoleLog: mockResponses[3],
    typeChange: mockResponses[4],
    longFunction: mockResponses[5],
    unusedVariable: mockResponses[6],
    noComments: mockResponses[7],
    looseEquality: mockResponses[8],
    arrayLoop: mockResponses[9],
    noJSDoc: mockResponses[10],
    nestedIf: mockResponses[11],
    ifWithoutElse: mockResponses[12],
    longLine: mockResponses[13],
    globalVariable: mockResponses[14],
    division: mockResponses[15],
    duplication: mockResponses[16],
    noTryCatch: mockResponses[17],
    outdatedMethod: mockResponses[18],
    default: mockResponses[19],
  }

  return responseMap[issueType] || responseMap['default']
}

export default getMockResponse