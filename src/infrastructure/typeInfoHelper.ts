
/**
 * 在线办理---本地校验对象
 */
export const typeInfos = [
    {
        title:'请先输入您的房产信息进行数据检验',
        Id: '131325212331073052',
        TypeCode: 'd4-1',
        Certificate: [ //校验所需证书类型
            { Name: '不动产证明' },
            { Name: '邕房预字第' }

        ],
        RoleInfo:{  //角色信息
            Title: '',
            Placeholder:'',
            EnterpriseInfo: { //企业信息
                Type: '银行',
                Text: 'name',
                Value: 'id',
            }
        },
        Auth: false, //是否需要权限
        quanlirenInfo:{
            titlelabel:'权利人',
            placeholder:'产权证上权利人,多个权利人只需输入一个',
        },
        RecordInfo:{ //备案信息
            Title: '备案企业',
            Text: '',
            Value: ''
        }
    },
    {
        title:'请先输入您的权籍调查信息进行数据检验',
        Id: '131332022959590791',
        TypeCode: 'b3',
        Certificate: [ //校验所需证书类型 ,为空则不需要


        ],
        RoleInfo:{  //角色信息
            Title: '',
            Placeholder:'',
            EnterpriseInfo: { //企业信息
                Type: '',
                Text: 'name',
                Value: 'id',
            }
        },
        quanlirenInfo:{
            titlelabel:'权籍调查编号',
            placeholder:'权籍调查成果条件上的12位编号',
        },
        Auth: false, //是否需要权限
        RecordInfo:{ //备案信息
            Title: '预告义务人证件号',
            Text: '',
            Value: ''
        }
    },
    {
        title:'请先输入您的房产信息进行数据检验',
        Id: '131327532875948443',
        TypeCode: 'd5',
        Certificate: [ //校验所需证书类型
            { Name: '不动产证明' },
            { Name: '邕房他字第' },
            { Name: '邕房预字第' } 

        ],
        RoleInfo:{  //角色信息
            Title: '',
            Placeholder:'',
            EnterpriseInfo: { //企业信息
                Type: '银行',
                Text: 'name',
                Value: 'id',
            }
        },
        quanlirenInfo:null,
        Auth: false, //是否需要权限
        RecordInfo:{ //备案信息
            Title: '权利人',
            Text: '',
            Value: ''
        }
    },
    {
        title:'请先输入您的首次登记信息进行数据检验',
        Id: '131365454977727419',
        TypeCode: 'b2',
        Certificate: [ //校验所需证书类型
            // { Name: '不动产证明' },
            // { Name: '邕房预' }

        ],
        RoleInfo:{  //角色信息
            Title: '',
            Placeholder:'',
            EnterpriseInfo: { //企业信息
                Type: '银行',
                Text: 'name',
                Value: 'id',
            }
        },
        quanlirenInfo:{
            titlelabel:'首次登记业务号',
            placeholder:'办理新建商品房首次登记的不动产登记业务号',
        },
        Auth: false, //是否需要权限
        RecordInfo:{ //备案信息
            Title: '义务人证件号',
            Text: '',
            Value: ''
        }
    },
    {
        title:'新建商品房、保障性住房首次登记',
        Id: '131508063458596779',
        TypeCode: 's1',
        Certificate: [ //校验所需证书类型
            // { Name: '不动产证明' },
            // { Name: '邕房预' }

        ],
        RoleInfo:{  //角色信息
            Title: '',
            Placeholder:'',
            EnterpriseInfo: { //企业信息
                Type: '银行',
                Text: 'name',
                Value: 'id',
            }
        },
        quanlirenInfo:{
            titlelabel:'权籍调查编号',
            placeholder:'委托转移登记权籍调查的权籍调查成果表上的12位业务编号',
        },
        Auth: false, //是否需要权限
        RecordInfo:{ //备案信息
            Title: '预告义务人证件号',
            Text: '',
            Value: ''
        }
    },
    {
        title:'预抵押转一般抵押登记',
        Id: '131508063954944446',
        TypeCode: 'd5-1',
        Certificate: [ //校验所需证书类型
            // { Name: '不动产证明' },
            // { Name: '邕房预' }

        ],
        RoleInfo:{  //角色信息
            Title: '',
            Placeholder:'',
            EnterpriseInfo: { //企业信息
                Type: '银行',
                Text: 'name',
                Value: 'id',
            }
        },
        quanlirenInfo:null,
        Auth: false, //是否需要权限
        RecordInfo:{ //备案信息
            Title: '抵押权人',
            Text: '',
            Value: ''
        }
    }
];








