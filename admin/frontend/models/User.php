<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "user".
 *
 * @property integer $user_id
 * @property string $user_name
 * @property string $user_address
 * @property integer $user_type
 * @property string $user_sex
 * @property string $user_work
 * @property string $user_phone
 */
class User extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'user';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['user_type'], 'integer'],
            [['user_name', 'user_sex', 'user_work'], 'string', 'max' => 30],
            [['user_address'], 'string', 'max' => 50],
            [['user_phone'], 'string', 'max' => 20]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'user_id' => 'User ID',
            'user_name' => 'User Name',
            'user_address' => 'User Address',
            'user_type' => 'User Type',
            'user_sex' => 'User Sex',
            'user_work' => 'User Work',
            'user_phone' => 'User Phone',
        ];
    }
}
