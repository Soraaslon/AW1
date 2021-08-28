function init(robot) {
	// your code goes here
}

function loop(robot) {
	if(robot.info().x >400 && robot.info().x <500)
		robot.action = {type:'jump',amount:10};
	else
		robot.action = {type:'move',amount:40};
}
