<?php
/*
 *检测师管理控制器
 *2016/06/12
 */

namespace frontend\controllers;

use yii;
use app\models\Testdivision;
use app\models\City;
use yii\web\Controller;

class CheckController extends \yii\web\Controller
{
	//检测师信息
    public function actionIndex()
    {
		$session=Yii::$app->session;
        $name = $session['login'];
		$name = $name['admin_name'];
		$arr = Testdivision::find()->asArray()->all();
		//print_R($arr);die;
        return $this->renderPartial('checklist', ['name' => $name, 'arr' => $arr]);
    }

	//检测师信息添加
	public function actionCheck()
	{
		$model = new Testdivision();
		$session=Yii::$app->session;
        $name = $session['login'];
		$name = $name['admin_name'];
		$city = City::find()->asArray()->all();
		//print_R($city);die;
		return $this->renderPartial('check', ['model' => $model, 'name' => $name, 'city' => $city]);
	}

	//添加入库
	public function actionCheckadd()
	{
		$model = new Testdivision();
		$name = $_POST['name'];
		$level = $_POST['level'];
		$sex = $_POST['sex'];
		$age = $_POST['age'];
		$address = $_POST['address'];
		$phone = $_POST['phone'];
		$model->division_name = $name;
		$model->division_level = $level;
		$model->division_sex = $sex;
		$model->division_age = $age;
		$model->division_address = $address;
		$model->division_phone = $phone;
		//print_r($model);die;
		if($model->save())
		{
			return $this->redirect('index.php?r=check');
		} else {
			return $this->redirect('index.php?r=check/check');
		}
	}

	//删除
	public function actionDel()
	{
		$id = Yii::$app->request->get('id');
		//echo $id;die;
		Testdivision::deleteAll("division_id = $id");
		return $this->redirect('index.php?r=check');
	}

	//修改页面
	public function actionModify()
	{
		$session = Yii::$app->session;
		$name = $session['login'];
		$name = $name['admin_name'];
		$id = Yii::$app->request->get('id');
		$arr = Testdivision::find()->where(['division_id' => $id])->asArray()->one();
		$city = City::find()->asArray()->all();
		//print_r($arr);die;
		return $this->renderPartial('modify', ['city' => $city, 'name' => $name, 'arr' => $arr]);
	}

	//修改入库
	public function actionCheck_modify()
	{
		$model = new Testdivision();
		$arr = Yii::$app->request->post();
		$id = $arr['id'];
		//print_r($arr);
		$model = $model::findOne($id);
		$model->division_name = $arr['name'];
		$model->division_level = $arr['level'];
		$model->division_sex = $arr['sex'];
		$model->division_age = $arr['age'];
		$model->division_address = $arr['address'];
		$model->division_phone = $arr['phone'];
		//print_r($model);die;
		if($model->update(array('division_name','division_level','division_sex','division_age','division_address','division_phone')))
		{
			return $this->redirect('index.php?r=check');
		} else {
			return $this->redirect("index.php?r=check/modify&id=$id");
		}
	}

}
