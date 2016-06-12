<?php
/*
 *管理系统首页控制器
 *2016/06/11
 */

namespace frontend\controllers;

use yii;
use yii\web\Controller;

class IndexController extends \yii\web\Controller
{
	//首页
    public function actionIndex()
    {
		$session=Yii::$app->session;
        $name = $session['login'];
		$name = $name['admin_name'];
        return $this->renderPartial('index', ['name' => $name]);
    }

	public function actionTables()
    {
        return $this->renderPartial('tables');
    }

	public function actionForm()
    {
        return $this->renderPartial('form-elements');
    }

}
