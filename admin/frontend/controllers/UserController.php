<?php
/*
 *用户管理控制器
 *2016/06/12
 */

namespace frontend\controllers;

class UserController extends \yii\web\Controller
{
	public function actionIndex()
	{
		$session=Yii::$app->session;
		$name = $session['login'];
		$name = $name['admin_name'];
		return $this->renderPartial('userlist', ['name' => $name]);
	}

}
