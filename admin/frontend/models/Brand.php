<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "brand".
 *
 * @property integer $brand_id
 * @property integer $parent_id
 * @property string $brand_name
 * @property integer $brand_hot
 */
class Brand extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'brand';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['parent_id', 'brand_hot'], 'integer'],
            [['brand_name'], 'string', 'max' => 20]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'brand_id' => 'Brand ID',
            'parent_id' => 'Parent ID',
            'brand_name' => 'Brand Name',
            'brand_hot' => 'Brand Hot',
        ];
    }
}
