// 用户模块
const { Comment } = require('../../../model/Comment');
// 验证模块
const Joi = require('joi');

//导出方法
module.exports = async (req, res) => {
    //获取当前文章ID
    var id = req.query.id;
    // 验证模型
    const schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('评论id不符合格式'))
    // 验证
    const { error } = Joi.validate(id, schema)
    // 数据格式没有通过验证
    if (error) return res.status(400).send({ message: error.message });

    //查找相关评论
    var coms = await Comment.find({ post: id }).populate('author','-password').sort('-createAt');
    res.send(coms)
}