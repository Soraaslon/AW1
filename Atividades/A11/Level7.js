function init(robot) {
	// your code goes here
}

function loop(robot) {
	if(robot.info().x >200 && robot.info().x <250)
		robot.action = {type:'jump',amount:10};
	else
		robot.action = {type:'move',amount:40};
}
