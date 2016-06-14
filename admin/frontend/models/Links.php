<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "links".
 *
 * @property integer $link_id
 * @property string $link_name
 * @property integer $link_type
 * @property string $link_url
 */
class Links extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'links';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['link_type'], 'integer'],
            [['link_name'], 'string', 'max' => 30],
            [['link_url'], 'string', 'max' => 255]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'link_id' => 'Link ID',
            'link_name' => 'Link Name',
            'link_type' => 'Link Type',
            'link_url' => 'Link Url',
        ];
    }
}
