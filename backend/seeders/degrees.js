const degrees = ['SPARCS Newbie', 'SPARCS Junior', 'SPARCS Senior', 'SPARCS SLAVE']

function caculateDegrees(points) {
  
  if (points < 100) {
    return degrees[0];
  }
  else if (100 <= points && points < 200) {
    return degrees[1];
  }
  else if (200 <= points && points < 300) {
    return degrees[2];
  }
  else {
    return degrees[3];
  }

}

module.exports = { degrees, caculateDegrees };