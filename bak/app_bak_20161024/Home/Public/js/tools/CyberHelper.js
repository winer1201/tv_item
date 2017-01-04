var CyberHelper = {
    //启动应用
    StartCloudApp: function (appID, backParam) {
        var AppStartParam = null, AppBackParam = null, returnObj = null;
        var r = {
            retcode: -1, desc: 'error'
        };
      
        if (typeof (CyberCloud) == "undefined") {
            r.retcode = -2;
            return r;
        }
        if (!CyberCloud.StartStreamAppEx || typeof (CyberCloud.StartStreamAppEx) != "function") {
            r.retcode = -3;
            return r;
        }

        AppStartParam = {
            //TenantID: m_cyber_tenantid,
            TenantID: "",
            AppID: appID,
            AppParam: "",
            ExtParam: "",
            DstResCode: ""
        };

        if (backParam && backParam != false) {
            AppBackParam = {
                //TenantID: m_cyber_tenantid,
                TenantID: "",
                AppID: m_cyber_tvportal_id,
                AppParam: backParam,
                ExtParam: "",
                DstResCode: ""
            };
        }

        //backParam = m_tp_ls_url + "?" + backParam;
        //AppBackParam = {
        //    //TenantID: m_cyber_tenantid,
        //    TenantID: "",
        //    AppID: 57,
        //    AppParam: backParam,
        //    ExtParam: "",
        //    DstResCode: ""
        //};
       
        AppBackParam = null;
        returnObj = CyberCloud.StartStreamAppEx(AppStartParam, AppBackParam);
        if (!returnObj) {
            r.retcode = -4;
            return r;
        }
        if (returnObj.ResultCode)
            r.retcode = returnObj.ResultCode;
        if (returnObj.Description)
            r.desc = returnObj.Description;

        return r;
    },
    //退出门户，返回epg
    ExitPortal:function(){
        var epgAppID = m_cyber_epg_id;
        StartCloudApp(epgAppID, false);
    },
    ExitApp:function(){
        var returnObj = null;
        var r = {
            retcode: -1, desc: 'error'
        };

        if (!CyberCloud) {
            r.retcode = -2;
            return r;
        }
        if (!CyberCloud.ExitApp || typeof (CyberCloud.ExitApp) != "function") {
            r.retcode = -3;
            return r;
        }
        returnObj = CyberCloud.ExitApp();
        if (!returnObj) {
            r.retcode = -4;
            return r;
        }
        if (returnObj.ResultCode)
            r.retcode = returnObj.ResultCode;
        if (returnObj.Description)
            r.desc = returnObj.Description;

        return r;
    },
    //退出云服务
    ExitCloud: function () {
        var returnObj = null;
        var r = {
            retcode: -1, desc: 'error'
        };

        if (!CyberCloud) {
            r.retcode = -2;
            return r;
        }
        if (!CyberCloud.ExitCloud || typeof (CyberCloud.ExitCloud) != "function") {
            r.retcode = -3;
            return r;
        }
        returnObj = CyberCloud.ExitCloud();
        if (!returnObj) {
            r.retcode = -4;
            return r;
        }
        if (returnObj.ResultCode)
            r.retcode = returnObj.ResultCode;
        if (returnObj.Description)
            r.desc = returnObj.Description;

        return r;
    }
};