<?php
/*
 *用户管理控制器
 *2016/06/11
 */

namespace frontend\controllers;

class UserController extends \yii\web\Controller
{
	public function actionIndex()
	{
		return $this->renderPartial('tables');
	}

}