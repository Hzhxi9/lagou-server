const formidable = require('formidable')

const upload = (err, req, res) => {
    /**创建一个可以解析上传回来的请求对象 */
    const form = new formidable.IncomingForm();

    /**设定上传路径 */
    form.uploadDir = __dirname + '/../uploads';

    /**设定上传的文件名保持后缀名 */
    form.keepExtensions = true

    /**
     * 让这个对象解析一下上传回来的数据
     * err: 错误
     * filed: 除了文件以外的其他数据
     * files: 所有上传回来的文件
     */
    form.parse(req, (err, filed, file) => {
        if (err) throw err;
        console.log(file)
        res.send('ok')
    })
}

module.exports = upload