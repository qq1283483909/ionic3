/**
 * 全局字符串
 */
export const CurrencyString = {
    /**
     * 公开档查询
     */
    gkdcxName: '公开档查询',

    /**
     * 名下档查询
     */
    mxdcxName: '名下档查询',

    /**
     * 个人档查询
     */
    grdcxName: '个人档查询',

    /**
     * 不动产权证
     */
    bdcqzName: '不动产权证',

    /**
     * 邕房权证
     */
    yfqzName: '邕房权证',

    /**
     * 其他
     */
    qtName: '其他',

    /**
     * 邕房预字
     */
    yfyzName: '邕房预字',

    /**
     * 邕房他字
     */
    yftzName: '邕房他字',

    /**
     * 南宁市不动产权
     */
    nnsbdcqzName: '南宁市不动产权',

    /**
     * 南宁市不动产证明
     */
    nnsbdczmName: '南宁市不动产证明',

    /**
     * 查询公开档
     */
    cxgkdName:'查询公开档',

    /**
     * 查询名下档
     */
    cxmxdName:'查询名下档',

    /**
     * 查询家庭档
     */
    cxjtdName:'查询家庭档',

    /**
     * 查询家庭成员
     */
    cxjtcyName:'查询家庭成员',

    /**
     * 查询机构档
     */
    cxjgdName:'查询机构档',

    /**
     * 查询本人
     */
    cxbrName:'查询本人',

    /**
     * 查档记录 
     */
    cdjlName:'查档记录 ', 

    /**
     * 邕房权证字
     */
    yfqzzName:'邕房权证字',
}

export const QueryString = {
    /**
    * 个人查档选项卡切换
    */
    queryinformationPet: CurrencyString.mxdcxName,
    queryinformationTabs: CurrencyString.bdcqzName,

    /**
     * 机构查档选项卡切换
     */
    queryOtherInformationPet: CurrencyString.grdcxName,
    queryOtherInformationTabs: CurrencyString.bdcqzName,

    /**
     * 查档曾用名的数量
     */
    beforeNameLength:10,
}
/**
* 错误信息模板 
*/
export const ValidationMessages = {
 userName: {
   required: '用户名不能为空',
   minlength: '用户名不能小于2个字符',
   maxlength: '用户名不能大于12个字符'
 },
 personNo: {
   required: '身份证号不能为空',
   ForRegExpValidator: '身份证号为18个字符'
 },
};

/**
 * 校验证书信息
 */
export const certificateInfos =[
    {
        /**
         * 证书名字
         */
        name: '不动产证明',
        /**
         * 证书格式
         */
        format: '桂(*)南宁市不动产证明第*号'
    }
]


