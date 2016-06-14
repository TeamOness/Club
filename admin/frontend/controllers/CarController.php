<?php
/*
 *汽车管理控制器
 *2016/06/12
 */

namespace frontend\controllers;

use yii;
use app\models\Details;
use app\models\User;
use app\models\Brank;
use yii\web\Controller;

class CarController extends \yii\web\Controller
{
	//汽车信息
    public function actionIndex()
    {
        $session=Yii::$app->session;
        $name = $session['login'];
		$name = $name['admin_name'];
		$details = Details::find()->joinWith('user')->joinWith('brand')->asArray()->all();;
		//print_r($details);die;
        return $this->renderPartial('index', ['name' => $name, 'details' => $details]);
    }

	//汽车检测信息添加
	public function actionCarcheck()
	{
		$session=Yii::$app->session;
        $name = $session['login'];
		$name = $name['admin_name'];
		return $this->renderPartial('carcheck', ['name' => $name]);
	}

}
