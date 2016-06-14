<?php
/*
 *友情链接管理控制器
 *2016/06/12
 */

namespace frontend\controllers;

use yii;
use app\models\Links;
use yii\web\Controller;

class LinkController extends \yii\web\Controller
{
	//友情链接
    public function actionIndex()
    {
		$session=Yii::$app->session;
        $name = $session['login'];
		$name = $name['admin_name'];
		$arr = Links::find()->asArray()->all();
		//print_R($arr);die;
        return $this->renderPartial('linklist', ['name' => $name, 'arr' => $arr]);
    }

	//添加
	public function actionLink()
	{
		$session=Yii::$app->session;
		$name = $session['login'];
		$name = $name['admin_name'];
		return $this->renderPartial('link', ['name' => $name]);
	}

	//添加入库
	public function actionLinkadd()
	{
		$model = new Links();
		$arr = Yii::$app->request->post();
		//print_r($arr);die;
		$model->link_name = $arr['name'];
		$model->link_url = $arr['url'];
		$model->link_type = $arr['type'];
		$model->link_ranking = $arr['ranking'];
		if($model->save())
		{
			return $this->redirect('index.php?r=link');
		} else {
			return $this->redirect('index.php?r=link/link');
		}
	}

	//修改页面
	public function actionModify()
	{
		$session = Yii::$app->session;
		$name = $session['login'];
		$name = $name['admin_name'];
		$id = Yii::$app->request->get();
		$arr = Links::find()->where(['link_id' => $id['id']])->asArray()->one();
		//print_r($arr);die;
		return $this->renderPartial('modify', ['name' => $name, 'arr' => $arr]);
	}

	//添加入库
	public function actionLink_modify()
	{
		$model = new Links();
		$arr = Yii::$app->request->post();
		$id = $arr['id'];
		//print_r($arr);
		$model = $model::findOne($id);
		$model->link_name = $arr['name'];
		$model->link_url = $arr['url'];
		$model->link_type = $arr['type'];
		$model->link_ranking = $arr['ranking'];
		//print_r($model);die;
		if($model->update(array('link_name','link_url','link_type','link_ranking')))
		{
			return $this->redirect('index.php?r=link');
		} else {
			return $this->redirect("index.php?r=link/modify&id=$id");
		}
	}

}
