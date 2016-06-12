<?php
/*
 *友情链接管理控制器
 *2016/06/12
 */

namespace frontend\controllers;

use yii;
use yii\web\Controller;

class LinkController extends \yii\web\Controller
{
	//友情链接
    public function actionIndex()
    {
		$session=Yii::$app->session;
        $name = $session['login'];
		$name = $name['admin_name'];
        return $this->renderPartial('linklist', ['name' => $name]);
    }

	//友情链接添加
	public function actionLink()
	{
		$session=Yii::$app->session;
        $name = $session['login'];
		$name = $name['admin_name'];
		return $this->renderPartial('link', ['name' => $name]);
	}

}
