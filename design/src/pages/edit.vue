<template>
	<form class='edit-form'>
		<div class='group-con'>
			<label>标题：</label>
			<input type='text' valud='请输入标题' />
		</div>
		<div class='group-con'>
			<label>举办目的：</label>
			<input type='text' valud='举办目的' />
		</div>
		<div class='group-con'>
			<label>举办时间：</label>
			<input type='text' valud='举办时间' />
		</div>
		<div class='group-con'>
			<label>举办地点：</label>
			<input type='text' valud='举办地点' />
		</div>
		<div class='group-con'>
			<label>举办单位：</label>
			<select>
				<option>请选择</option>
			</select>
		</div>
		<div class='group-con'>
			<label>举办内容：</label>
			<textarea></textarea>
		</div>
		<div class='group-con'>
			<label>附加说明：</label>
			<input type='text' valud='附加说明' />
		</div>
		<div class='group-con'>
			<label>活动封面：</label>
			<input type='file'/>
			<img :src='' />
		</div>
		<div class='group-con'>
			<label>附件：</label>
			<input type='file' multiple />
		</div>
	</form>
</template>