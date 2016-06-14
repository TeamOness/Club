<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "details".
 *
 * @property integer $details_id
 * @property integer $user_id
 * @property integer $sell_type
 * @property integer $brand_id
 * @property string $details_time
 * @property string $details_oil
 * @property string $details_weight
 * @property string $details_move
 * @property string $details_type
 * @property string $details_num
 * @property string $details_price
 * @property string $details_allprice
 * @property string $details_first
 * @property string $details_brandtime
 * @property string $details_mial
 * @property string $details_standard
 * @property string $details_address
 * @property string $details_img
 * @property string $details_introduction
 * @property string $details_year
 * @property string $details_insurance
 * @property string $details_commercial
 * @property integer $details_number
 */
class Details extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'details';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['user_id', 'sell_type', 'brand_id', 'details_number'], 'integer'],
            [['details_price', 'details_allprice', 'details_first'], 'number'],
            [['details_introduction'], 'string'],
            [['details_time', 'details_type', 'details_mial'], 'string', 'max' => 50],
            [['details_oil', 'details_weight'], 'string', 'max' => 11],
            [['details_move', 'details_num', 'details_brandtime'], 'string', 'max' => 20],
            [['details_standard', 'details_address', 'details_year', 'details_insurance', 'details_commercial'], 'string', 'max' => 30],
            [['details_img'], 'string', 'max' => 255]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'details_id' => 'Details ID',
            'user_id' => 'User ID',
            'sell_type' => 'Sell Type',
            'brand_id' => 'Brand ID',
            'details_time' => 'Details Time',
            'details_oil' => 'Details Oil',
            'details_weight' => 'Details Weight',
            'details_move' => 'Details Move',
            'details_type' => 'Details Type',
            'details_num' => 'Details Num',
            'details_price' => 'Details Price',
            'details_allprice' => 'Details Allprice',
            'details_first' => 'Details First',
            'details_brandtime' => 'Details Brandtime',
            'details_mial' => 'Details Mial',
            'details_standard' => 'Details Standard',
            'details_address' => 'Details Address',
            'details_img' => 'Details Img',
            'details_introduction' => 'Details Introduction',
            'details_year' => 'Details Year',
            'details_insurance' => 'Details Insurance',
            'details_commercial' => 'Details Commercial',
            'details_number' => 'Details Number',
        ];
    }

	public function getUser()
    {
        return $this->hasMany(User::className(), ['user_id' => 'user_id']);
    }
	
	public function getBrand()
    {
        return $this->hasMany(Brand::className(), ['brand_id' => 'brand_id']);
    }
}
