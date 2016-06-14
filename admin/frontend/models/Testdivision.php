<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "test_division".
 *
 * @property integer $division_id
 * @property string $division_name
 * @property string $division_level
 * @property string $division_sex
 * @property integer $division_age
 * @property string $division_address
 * @property string $division_phone
 */
class Testdivision extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'test_division';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['division_age'], 'integer'],
            [['division_name', 'division_sex', 'division_phone'], 'string', 'max' => 30],
            [['division_level', 'division_address'], 'string', 'max' => 50]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'division_id' => 'Division ID',
            'division_name' => 'Division Name',
            'division_level' => 'Division Level',
            'division_sex' => 'Division Sex',
            'division_age' => 'Division Age',
            'division_address' => 'Division Address',
            'division_phone' => 'Division Phone',
        ];
    }
}
