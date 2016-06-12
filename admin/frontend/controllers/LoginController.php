<?php
/*
 *管理员登录控制器
 *2016/06/12
 */

namespace frontend\controllers;

use yii;
use yii\web\Controller;
use app\models\Admin;

class LoginController extends \yii\web\Controller
{
	public $enableCsrfValidation=false;
	public function actionIndex()
	{
		return $this->renderPartial('index');
	}

	//登录
	public function actionLogin()
	{
		$model = new Admin;
		$arr = Yii::$app->request->post();
		$name = $arr['name'];
		$pwd = $arr['pwd'];
		$find = $model::find()->where(['admin_name' => $name])->asArray()->all();
		foreach($find as $v)
		{
			$find = $v;
		}
		if($find['admin_name'] == $name)
		{
			if($find['admin_pwd'] == $pwd)
			{
				$session=Yii::$app->session;
				$session['login']=$find;
				return $this->redirect('index.php?r=index');
			} else {
				return $this->redirect('index.php?r=login');
			}
		} else {
			return $this->redirect('index.php?r=login');
		}
	}

	//退出
	public function actionOut()
	{
		$session=Yii::$app->session;
		$session->destroy($session);
		return $this->redirect('index.php?r=login');
	}

}
