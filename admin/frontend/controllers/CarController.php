<?php
/*
 *汽车管理控制器
 *2016/06/12
 */

namespace frontend\controllers;

use yii;
use app\models\Details;
use app\models\User;
use app\models\Brand;
use app\models\City;
use yii\web\Controller;

class CarController extends \yii\web\Controller
{
	//汽车信息
    public function actionIndex()
    {
        $session=Yii::$app->session;
        $name = $session['login'];
		$name = $name['admin_name'];
		$details = Details::find()->joinWith('user')->joinWith('brand')->asArray()->all();
		//print_r($details);die;
        return $this->renderPartial('index', ['name' => $name, 'details' => $details]);
    }

	//汽车检测信息添加
	public function actionCarcheck()
	{
		$session=Yii::$app->session;
        $name = $session['login'];
		$name = $name['admin_name'];
		$user = User::find()->select(['user_name', 'user_id'])->where(['user_type' => 1])->asArray()->all();
		$brand = Brand::find()->where(['parent_id' => 0])->asArray()->all();
		$city = City::find()->asArray()->all();
		//print_r($brand);die;
		return $this->renderPartial('carcheck', ['name' => $name, 'user' =>$user, 'brand' => $brand, 'city' => $city]);
	}

	//信息入库
	public function actionCaradd()
	{
		$model = new Details;
		$arr = Yii::$app->request->post();
		$model->user_id = $arr['user_id'];
		$model->brand_id = $arr['brand_id'];
		$model->details_time = $arr['details_time'];
		$model->details_oil = $arr['details_oil'];
		$model->details_weight = $arr['details_weight'];
		$model->details_move = $arr['details_move'];
		$model->details_type = $arr['details_type'];
		$model->details_price = $arr['details_price'];
		$model->details_first = $arr['details_first'];
		$model->details_brandtime = $arr['details_brandtime'];
		$model->details_address = $arr['details_address'];
		$model->details_mial = $arr['details_mial'];
		$model->details_introduction = $arr['details_introduction'];
		$model->details_year = $arr['details_year'];
		$model->details_insurance = $arr['details_insurance'];
		$model->details_commercial = $arr['details_commercial'];
		$model->details_number = $arr['details_number'];
		$time = strtotime(date('Y-m-d H:i:s'));
		$model->details_num = 'HC-'.$time;
		//print_r($model);die;
		if($model->save())
		{
			return $this->redirect('index.php?r=car');
		} else {
			return $this->redirect('index.php?r=car/carcheck');
		}
	}

	//删除
	public function actionDel()
	{
		$id = Yii::$app->request->get('id');
		//echo $id;die;
		Details::deleteAll("details_id = $id");
		return $this->redirect('index.php?r=car');
	}

	//详情
	public function actionDetails()
	{
		$session=Yii::$app->session;
        $name = $session['login'];
		$name = $name['admin_name'];
		$id = Yii::$app->request->get('id');
		//echo $id;die;
		$details = Details::find()->joinWith('user')->joinWith('brand')->where(['details_id' => $id])->asArray()->all();
		//print_r($details);die;
		return $this->renderPartial('blank', ['name' => $name, 'details' => $details]);
	}

}
