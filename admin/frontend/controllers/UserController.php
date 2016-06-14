<?php
/*
 *用户管理控制器
 *2016/06/12
 */

namespace frontend\controllers;

use yii;
use app\models\User;
use yii\web\Controller;

class UserController extends \yii\web\Controller
{
	public function actionIndex()
	{
		$session=Yii::$app->session;
		$name = $session['login'];
		$name = $name['admin_name'];
		$list = User::find()->asArray()->all();
		//print_r($list);die;
		return $this->renderPartial('userlist', ['name' => $name, 'list' => $list]);
	}

	//删除
	public function actionDel()
	{
		$id = Yii::$app->request->get('id');
		User::deleteAll("user_id = $id");
		return $this->redirect('index.php?r=user');
	}

}
