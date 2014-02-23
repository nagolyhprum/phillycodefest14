<!--
git add -A
git commit -m "fixed a few minor issues"
git pull https://github.com/nagolyhprum/phillycodefest14.git
git push https://github.com/nagolyhprum/phillycodefest14.git
-->
<!doctype html>
<html>
	<body>
		<canvas style="background:lightblue;width:100%;height:100%;position:fixed;left:0;top:0;" id="stage" height="480" width="640"></canvas>
		<table id="signup">
			<tr>
				<td>Name</td>
				<td><input type="text" id="name"/></td>
			</tr>
			<tr>
				<td>Height</td>
				<td><input type="text" id="height"/></td>
			</tr>
			<tr>
				<td>Weight</td>
				<td><input type="text" id="weight"/></td>
			</tr>
			<tr>
				<td>Age</td>
				<td><input type="text" id="age"/></td>
			</tr>
			<tr>
				<td>Gender</td>
				<td>
					<select id="gender">
						<option value="1">Male</option>
						<option value="0">Female</option>
					</select>
				</td>
			</tr>
			<tr>
				<td>
				</td>				
				<td>
					<input type="button" id="action" value="Sign up"/>
				</td>
			</tr>
		</table>
		<script src="http://code.createjs.com/createjs-2013.12.12.min.js" type="text/javascript"></script>
		<script src="//code.jquery.com/jquery-1.10.2.js" type="text/javascript"></script>
		<script src="js/db.js" type="text/javascript"></script>
		<script src="js/utils.js" type="text/javascript"></script>
		<script src="js/create.js" type="text/javascript"></script>
	</body>
</html>