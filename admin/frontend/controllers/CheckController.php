<?php
/*
 *检测师管理控制器
 *2016/06/12
 */

namespace frontend\controllers;

use yii;
use yii\web\Controller;

class CheckController extends \yii\web\Controller
{
	//检测师信息
    public function actionIndex()
    {
		$session=Yii::$app->session;
        $name = $session['login'];
		$name = $name['admin_name'];
        return $this->renderPartial('checklist', ['name' => $name]);
    }

	//检测师信息添加
	public function actionCheck()
	{
		$session=Yii::$app->session;
        $name = $session['login'];
		$name = $name['admin_name'];
		return $this->renderPartial('check', ['name' => $name]);
	}

}
