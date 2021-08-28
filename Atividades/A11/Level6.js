function init(robot) {
	robot.moveTurn = true;
}

function loop(robot) {
	if(robot.info().x >1500 || robot.info().x <50){
		robot.moveTurn = !robot.moveTurn;
	}
	if(robot.moveTurn == true)
		robot.action = {type:'move',amount:40};
	else
		robot.action = {type:'move',amount:-40};
}
