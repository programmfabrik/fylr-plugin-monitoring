// GET /api/v1/plugin/extension/monitoring-endpoint/monitoring

const fs = require('fs');
const https = require('https');

let info = {}
if (process.argv.length >= 3) {
    info = JSON.parse(process.argv[2])
}

// throws api-error to frontend
function throwError(error, description) {
    console.log(JSON.stringify({
        "error": {
            "code": "error.validation",
            "statuscode": 400,
            "realm": "api",
            "error": error,
            "parameters": {},
            "description": description
        }
    }));
    process.exit(0);
}

process.stdin.on('data', d => {
    try {
        input += d.toString();
    } catch (e) {
        console.error(`Could not read input into string: ${e.message}`, e.stack);
        process.exit(1);
    }
});

process.stdin.on('end', () => {

    let result = {};

    //////////////////////////////////////////////////////////////
    // Accesstoken
    let access_token = info.api_user_access_token;

    function getPluginInfoFromAPI() {
        return new Promise((resolve, reject) => {
            var url = 'http://fylr.localhost:8082/inspect/plugins';
            fetch(url, {
                    headers: {
                        'Accept': 'application/json'
                    },
                })
                .then(response => {
                    if (response.ok) {
                        resolve(response.json());
                    } else {
                        throwError("Fehler bei der Anfrage an /api/v1/plugin/ ", '');
                    }
                })
                .catch(error => {
                    console.log(error);
                    throwError("Fehler bei der Anfrage an /api/v1/plugin ", '');
                });
        });
    }

    function getStatsInfoFromAPI() {
        return new Promise((resolve, reject) => {
            var url = 'http://fylr.localhost:8082/inspect/system/status/'
            fetch(url, {
                    headers: {
                        'Accept': 'application/json'
                    },
                })
                .then(response => {
                    if (response.ok) {
                        resolve(response.json());
                    } else {
                        throwError("Fehler bei der Anfrage an /inspect/system/status/ ", '');
                    }
                })
                .catch(error => {
                    console.log(error);
                    throwError("Fehler bei der Anfrage an /inspect/system/status/ ", '');
                });
        });
    }

    function getTagInfoFromAPI() {
        return new Promise((resolve, reject) => {
            var url = 'http://fylr.localhost:8082/inspect/tags/'
            fetch(url, {
                    headers: {
                        'Accept': 'application/json'
                    },
                })
                .then(response => {
                    if (response.ok) {
                        resolve(response.json());
                    } else {
                        throwError("Fehler bei der Anfrage an /inspect/system/status/ ", '');
                    }
                })
                .catch(error => {
                    console.log(error);
                    throwError("Fehler bei der Anfrage an /inspect/system/status/ ", '');
                });
        });
    }

    function getSessionInfoFromAPI() {
        return new Promise((resolve, reject) => {
            var url = 'http://fylr.localhost:8081/api/v1/user/session?access_token=' + access_token
            fetch(url, {
                    headers: {
                        'Accept': 'application/json'
                    },
                })
                .then(response => {
                    if (response.ok) {
                        resolve(response.json());
                    } else {
                        throwError("Fehler bei der Anfrage an /api/v1/user/session ", '');
                    }
                })
                .catch(error => {
                    console.log(error);
                    throwError("Fehler bei der Anfrage an /api/v1/user/session ", '');
                });
        });
    }

    function getCURRENTFromAPI() {
        return new Promise((resolve, reject) => {
            var url = 'http://fylr.localhost:8081/api/v1/schema/user/CURRENT?access_token=' + access_token
            fetch(url, {
                    headers: {
                        'Accept': 'application/json'
                    },
                })
                .then(response => {
                    if (response.ok) {
                        resolve(response.json());
                    } else {
                        throwError("Fehler bei der Anfrage an /schema/user/CURRENT ", '');
                    }
                })
                .catch(error => {
                    console.log(error);
                    throwError("Fehler bei der Anfrage an /schema/user/CURRENT ", '');
                });
        });
    }

    function getHEADFromAPI() {
        return new Promise((resolve, reject) => {
            var url = 'http://fylr.localhost:8081/api/v1/schema/user/HEAD?access_token=' + access_token
            fetch(url, {
                    headers: {
                        'Accept': 'application/json'
                    },
                })
                .then(response => {
                    if (response.ok) {
                        resolve(response.json());
                    } else {
                        throwError("Fehler bei der Anfrage an /schema/user/HEAD ", '');
                    }
                })
                .catch(error => {
                    console.log(error);
                    throwError("Fehler bei der Anfrage an /schema/user/HEAD ", '');
                });
        });
    }

    function getConfigFromAPI() {
        return new Promise((resolve, reject) => {
            var url = 'http://fylr.localhost:8081/api/v1/config?access_token=' + access_token
            fetch(url, {
                    headers: {
                        'Accept': 'application/json'
                    },
                })
                .then(response => {
                    if (response.ok) {
                        resolve(response.json());
                    } else {
                        throwError("Fehler bei der Anfrage an /config ", '');
                    }
                })
                .catch(error => {
                    console.log(error);
                    throwError("Fehler bei der Anfrage an /config ", '');
                });
        });
    }

    function getConfigFromInspectAPI() {
        return new Promise((resolve, reject) => {
            var url = 'http://fylr.localhost:8082/inspect/config'
            fetch(url, {
                    headers: {
                        'Accept': 'application/json'
                    },
                })
                .then(response => {
                    if (response.ok) {
                        resolve(response.json());
                    } else {
                        throwError("Fehler bei der Anfrage an /inspect/config ", '');
                    }
                })
                .catch(error => {
                    console.log(error);
                    throwError("Fehler bei der Anfrage an /inspect/config ", '');
                });
        });
    }
    
   function getPoolStatsFromAPI() {
        return new Promise((resolve, reject) => {
            var url = 'http://fylr.localhost:8082/inspect/pools/1/'
            fetch(url, {
                    headers: {
                        'Accept': 'application/json'
                    },
                })
                .then(response => {
                    if (response.ok) {
                        resolve(response.json());
                    } else {
                        throwError("Fehler bei der Anfrage an /pools/stats ", '');
                    }
                })
                .catch(error => {
                    console.log(error);
                    throwError("Fehler bei der Anfrage an /pools/stats ", '');
                });
        });
    }
    
    function getObjecttypeStatsFromAPI() {
        return new Promise((resolve, reject) => {
            fetch('http://fylr.localhost:8081/api/v1/objecttype?access_token=' + access_token, {
                headers: {
                    'Accept': 'application/json'
                },
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Fehler bei der Anfrage an /inspect/objecttypes/");
                }
            })
            .then(objecttypes => {
                objecttypes = objecttypes.map((objecttype) => objecttype.objecttype.name);
                let statsPromises = objecttypes.map(objecttype => {
                    let url = `http://fylr.localhost:8082/inspect/objecttypes/${objecttype}/`;
                    return fetch(url, {
                        headers: {
                            'Accept': 'application/json'
                        },
                    })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error(`Fehler bei der Anfrage an /inspect/objecttypes/${objecttype}/`);
                        }
                    });
                });
                return Promise.all(statsPromises);
            })
            .then(allStats => {
                resolve(allStats);
            })
            .catch(error => {
                console.log(error);
                throwError("Fehler bei der Anfrage an /inspect/objecttypes/ oder /objecttype/stats ", "");
            });
        });
    }


    async function fetchData() {
        const infoData = await Promise.all([
                getStatsInfoFromAPI(),
                getSessionInfoFromAPI(),
                getCURRENTFromAPI(),
                getHEADFromAPI(),
                getTagInfoFromAPI(),
                getPluginInfoFromAPI(),
                getConfigFromAPI(),
                getConfigFromInspectAPI(),
                getPoolStatsFromAPI(),
                getObjecttypeStatsFromAPI()
        ]);

        let configinfo = infoData[6];
    
        //////////////////////////////////////////////////////////////
        // email-configs
        result.email = {};

        //////////////////////////////////////////////////////////////
        // notifications?
        let notifications = false;
        if (configinfo?.system?.config?.notification_scheduler?.active) {
            if (configinfo.system.config.notification_scheduler.active = true) {
                notifications = true;
            }
        }
        result.email.notifications = notifications;

        //////////////////////////////////////////////////////////////
        // Email-Server
        let email_server = '';
        if (configinfo?.system?.config?.email_server?.server_addr) {
            email_server = configinfo.system.config.email_server.server_addr;
        }
        result.email.email_server = email_server;

        //////////////////////////////////////////////////////////////
        // Admin-Emails
        let maskedEmails = [];
        if (configinfo?.system?.config?.email?.admin_emails) {
            let adminEmails = configinfo.system.config.email.admin_emails;
            adminEmails = adminEmails.filter(emailObj => emailObj.email.length > 0);
            maskedEmails = adminEmails.map(email => {
                email = email.email;
                let maskedEmail = '';
                for (let i = 0; i < email.length; i++) {
                    maskedEmail += i % 2 === 0 ? email[i] : '*';
                }
                return maskedEmail;
            });
        } else {
            console.log('Admin emails do not exist.');
        }
        result.email.adminEmails = maskedEmails;

        //////////////////////////////////////////////////////////////
        // Janitor-Status
        let janitor = {};
        let janitorActive = false;
        let janitorEscalate = false;
        let eventDeletionEnabled = true;
        if (configinfo?.system?.config?.janitor) {
            // janitor enabled?
            if (configinfo.system.config.janitor.active == true) {
                janitorActive = true;
            } else {
                janitorEscalate = true;
            }
            // check if all events have a small deletion daylimit
            for (const eventType in configinfo.system.config.janitor.events) {
                eventConfigVal = configinfo.system.config.janitor.events[eventType];
                if (eventConfigVal == null || eventConfigVal > 10 || eventConfigVal < 1) {
                    janitorEscalate = true;
                    eventDeletionEnabled = false;
                }
            }
        }
        janitor.janitorActive = janitorActive;
        janitor.eventDeletionEnabled = eventDeletionEnabled;
        janitor.escalate = janitorEscalate;
        result.janitor = janitor;

        //////////////////////////////////////////////////////////////
        // Loglevel
        let logLevel = '';
        if (configinfo?.system?.config?.logging?.level) {
            logLevel = configinfo.system.config.logging.level;
        }
        result.logLevel = logLevel;


        result.purge = {};
        //////////////////////////////////////////////////////////////
        // allow purge?

        let purgeInfo = infoData[7].BaseConfigList.find(obj => obj.Name === "purge");
        purgeInfo = purgeInfo.Values;
        let allowPurge = false;
        if (purgeInfo?.allow_purge?.ValueBool) {
            if (purgeInfo.allow_purge?.ValueBool == true) {
                allowPurge = true;
            }
        }
        result.purge.allowPurge = allowPurge;

        //////////////////////////////////////////////////////////////
        // allow purge storage?
        let allowPurgeStorage = false;
        if (purgeInfo?.purge_storage?.ValueBool) {
            if (purgeInfo.purge_storage?.ValueBool == true) {
                allowPurgeStorage = true;
            }
        }
        result.purge.allowPurgeStorage = allowPurgeStorage;

        //////////////////////////////////////////////////////////////
        // objectstore
        let objectstore = false;
        if (configinfo?.system?.config?.objectstore?.uid) {
            objectstore = {};
            objectstore.uid = configinfo.system.config.objectstore.uid;
            if (configinfo?.system?.config?.objectstore?.instance) {
                objectstore.instance = configinfo.system.config.objectstore.instance;
            }
        }
        result.objectstore = objectstore;


        //////////////////////////////////////////////////////////////
        // license
        result.license = {}

        let licenseObject = infoData[7].BaseConfigList.find(obj => obj.Name === "license");
        licenseObject = licenseObject.Values.license.ValueJSON;

        var licenseDomains = licenseObject.domains;
        licenseDomains = licenseDomains.map((s) => s.trim());
        var externalURL = info.external_url;
        externalURL = externalURL.replace('https://', '');
        externalURL = externalURL.replace('https//', '');
        externalURL = externalURL.trim();
        if (!licenseDomains.includes(externalURL)) {
            result.license.domainConflict = true;
        }

        //////////////////////////////////////////////////////////////
        // license created at
        let licenseCreatedAt = '-';
        if (licenseObject?.created_at) {
            licenseCreatedAt = licenseObject?.created_at;
        }
        result.license.licenseCreatedAt = licenseCreatedAt;

        //////////////////////////////////////////////////////////////
        // license valid to
        let licenseValidTo = '-';
        if (licenseObject?.valid.to) {
            licenseValidTo = licenseObject.valid.to;
        }
        result.license.licenseValidTo = licenseValidTo;

        //////////////////////////////////////////////////////////////
        // Plugins
        let pluginNames = [];
        if (configinfo?.plugin) {
            pluginNames = Object.keys(configinfo.plugin);
        }
        result.plugins = pluginNames;

        // inspect Schema and check if there is an open commit
        let currentData = infoData[2];
        const currentSchemaVersion = currentData.version;
        let headData = infoData[3];
        const headSchemaVersion = headData.version;
        result.pendingSchemaCommits = !(headSchemaVersion == currentSchemaVersion);

        let sessionData = infoData[1];

        // check, if user has systemright to use the validation-endpoint, else throw error
        let allowMonitoringEndpoint = false;
        if (sessionData.system_rights['plugin.monitoring-endpoint.monitoring_endpoint']) {
            if (sessionData.system_rights['plugin.monitoring-endpoint.monitoring_endpoint'].use_monitoring_endpoint) {
                if (sessionData.system_rights['plugin.monitoring-endpoint.monitoring_endpoint'].use_monitoring_endpoint == true) {
                    allowMonitoringEndpoint = true;
                }
            }
        }
        if (sessionData.system_rights['system.root']) {
            allowMonitoringEndpoint = true;
        }
        if (allowMonitoringEndpoint == false) {
            throwError("Der User besitzt nicht das Systemrecht für die Nutzung des Monitoring-Endpoints", '');
        }

        // validation
        let validationEnabled = false;
        result.validation = {};
        if (sessionData.config.base.plugin['custom-vzg-validationhub']) {
            if (sessionData.config.base.plugin['custom-vzg-validationhub'].config['VZG-Validationhub'].enable_validation) {
                if (sessionData.config.base.plugin['custom-vzg-validationhub'].config['VZG-Validationhub'].enable_validation == true) {
                    validationEnabled = true;
                }
            }
        }
        result.validation.validationEnabled = validationEnabled;

        if (validationEnabled == true) {
            // check if all objecttypes and tags, which are used in validation still exist!
            const objecttypeList = infoData[2].tables.map(item => item.name);

            const tagList = infoData[4].Tags.flatMap(item => item.Tags.map(tag => tag.Id));

            // check tags
            let tagFilterFine = false;
            const tagfilter_select = sessionData.config.base.plugin['custom-vzg-validationhub'].config['VZG-Validationhub'].tagfilter_select;
            if (Object.keys(tagfilter_select).length === 0) {
                tagFilterFine = true;
            } else {
                const anyMatch = tagfilter_select.any.every(id => tagList.includes(id));
                const allMatch = tagfilter_select.all.every(id => tagList.includes(id));
                const notMatch = tagfilter_select.not.every(id => tagList.includes(id));

                if (anyMatch && allMatch && notMatch) {
                    tagFilterFine = true;
                }
            }
            result.validation.tagFilterValid = tagFilterFine;

            // check objecttypes
            const validation_selector = JSON.parse(sessionData.config.base.plugin['custom-vzg-validationhub'].config['VZG-Validationhub'].validation_selector);
            const objectTypes = validation_selector.data_table.map(item => item.objecttype);
            const allPresent = objectTypes.every(objectType => objecttypeList.includes(objectType));
            const missingObjectTypes = objectTypes.filter(objectType => !objecttypeList.includes(objectType));

            result.validation.objecttypeFilterValid = allPresent;
            if (missingObjectTypes.length > 0) {
                result.validation.objecttypeFilterErrors = missingObjectTypes;
            }
        }

        // disabled plugins? via https://fylr-test.gbv.de/inspect/plugins/
        result.pluginsAllEnabled = true;
        pluginInfo = infoData[5].Plugins;
        disabledPlugins = pluginInfo.map(plugin => {
            if (plugin.Enabled == false) {
                return plugin.Name;
            } else {
                return;
            }
        }).filter(Boolean);
        if (disabledPlugins.length > 0) {
            result.pluginsAllEnabled = false;
            result.pluginsDisabled = disabledPlugins;
        }
          
        // filestats
        result.file_stats = {};
        result.file_stats.count = 0;
        result.file_stats.size = 0;

        // from pool
        if (infoData[8]) {
            if (infoData[8].PoolStatsSubpools) {
                result.file_stats.count = infoData[8].PoolStatsSubpools.files.count;
                result.file_stats.size = infoData[8].PoolStatsSubpools.files.size;
            }
        }

        // from objecttype
        if(infoData[9].length > 0) {
            let otCount = 0;
            let otSize = 0;
            for(let i=0;i<infoData[9].length;i++){
                if(infoData[9][i].OtStats) {
                    if(infoData[9][i].OtStats.files) {
                        if(infoData[9][i].OtStats.files.size) {
                            var size = infoData[9][i].OtStats.files.size;
                            var count = infoData[9][i].OtStats.files.count;
                            if(count) {
                                otCount += count;
                            }
                            if(size != 0) {
                                otSize = otSize + size;
                            }
                        }
                    }
                }
            }
            result.file_stats.count += otCount;
            result.file_stats.size += otSize;
        }

        if(result.file_stats.count > 0) {
            var sizeString = (result.file_stats.size / (1024 ** 3)).toFixed(2) + ' GB';
            if(sizeString == '0.00 GB') {
                sizeString = (result.file_stats.size / (1024 ** 2)).toFixed(2) + ' MB';
            } 
            result.file_stats.size = sizeString;
        }


        // parse info from settings (via session)
        result.name = sessionData.instance.name;
        result.external_url = info.external_url;
        result.config_name = sessionData.instance.config_name;
        result.startup_time = sessionData.instance.startup_time;
        result.version = sessionData.instance.version;
        result.build_commit = sessionData.instance.build_commit;
        result.build_commit_time = sessionData.instance.build_commit_time;

        const pluginBaseConfig = sessionData.config.base.plugin['monitoring-endpoint'].config['monitoring_endpoint'];

        // check if plugin is enabled! Else error!
        let monitoringEnabled = false;
        if (pluginBaseConfig.enabled == true) {
            monitoringEnabled = true;
        }
        if (monitoringEnabled == false) {
            throwError("Monitoring-Endpoint nicht aktiviert!", '');
        }

        // license-escalation-info
        let licenseEarlyWarningInWeeks = 2;
        let escalateValidation = false;
        if (pluginBaseConfig.license_early_warning_in_weeks != null) {
            licenseEarlyWarningInWeeks = pluginBaseConfig.license_early_warning_in_weeks;
        }
        const validToTimestamp = new Date(result.license.licenseValidTo);
        const currentDate = new Date();
        const timeDifference = validToTimestamp.getTime() - currentDate.getTime();
        const threeWeeksInMilliseconds = 1000 * 60 * 60 * 24 * 7 * licenseEarlyWarningInWeeks;
        if (timeDifference < threeWeeksInMilliseconds) {
            escalateValidation = true; // Der Zeitstempel liegt weniger als drei Wochen in der Zukunft
        }

        // if no license at all
        if (result.license.licenseValidTo == '-' || result.license.licenseCreatedAt == '-') {
            escalateValidation = true;
        }
        // if domainconflict in license
        if (result.license.domainConflict == true) {
            escalateValidation = true;
        }


        result.license.escalate = escalateValidation;

        // shell the license-dates be echoed?
        let echoLicenseDates = false;
        if (pluginBaseConfig.license_show_dates_in_response == true) {
            echoLicenseDates = true;
        }
        if (echoLicenseDates == false) {
            result.license.licenseCreatedAt = '-';
            result.license.licenseValidTo = '-';
        }

        // parse statistics
        result.statistics = {};
        result.statistics.user = infoData[0].Stats.indices_objects.BaseRead.user;
        result.statistics.group = infoData[0].Stats.indices_objects.BaseRead.group;
        result.statistics.pool = infoData[0].Stats.indices_objects.BaseRead.pool;
        result.statistics.objecttypes = infoData[0].Stats.indices_objects.ObjectRead;

        //////////////////////////////////////////////////////////////
        // summary-status (ok, warning, error)

        function increaseStatus(code) {
            if (result.status != 'error') {
                if (code == 'warning') {
                    result.status = 'warning';
                }
            }
            if (code == 'error') {
                result.status = code;
            }
        }

        result.status = 'ok';
        result.statusmessage = 'everything as expected';

        let statusEscalationLevels = {};

        statusEscalationLevels = {};
        statusEscalationLevels.email = pluginBaseConfig.status__email;
        statusEscalationLevels.license = pluginBaseConfig.status__license;
        statusEscalationLevels.validation = pluginBaseConfig.status__validation;
        statusEscalationLevels.purge = pluginBaseConfig.status__purge;
        statusEscalationLevels.loglevel = pluginBaseConfig.status__loglevel;
        statusEscalationLevels.pluginsallenabled = pluginBaseConfig.status__disabled_plugins;
        statusEscalationLevels.janitoreventdeletionenabled = pluginBaseConfig.status__janitor_event_deletion;

        //result.statusEscalationLevels = statusEscalationLevels;

        let statusResults = {};
        statusResults = {};
        statusResults.email = 'nothing';
        statusResults.license = 'nothing';
        statusResults.validation = 'nothing';
        statusResults.purge = 'nothing';
        statusResults.loglevel = 'nothing';
        statusResults.janitor = 'nothing';

        let statusMessages = [];

        // check janitor for status-influence
        if (statusEscalationLevels.janitoreventdeletionenabled !== 'nothing') {
            if (result.janitor.escalate !== false) {
                statusResults.janitor = statusEscalationLevels.janitoreventdeletionenabled;
                statusMessages.push('Janitor');
                increaseStatus(statusEscalationLevels.janitoreventdeletionenabled);
            }
        }

        // check email for status-influence
        if (statusEscalationLevels.email !== 'nothing') {
            if (result.email.notifications !== true || result.email.email_server == '' || result.email.adminEmails.length == 0) {
                statusResults.email = statusEscalationLevels.email;
                statusMessages.push('E-Mail');
                increaseStatus(statusEscalationLevels.email);
            }
        }

        // check license for status-influence
        if (statusEscalationLevels.license !== 'nothing') {
            if (result.license.escalate === true) {
                statusResults.license = statusEscalationLevels.license;
                statusMessages.push('License');
                increaseStatus(statusEscalationLevels.license);
            }
        }

        // check validation for status-influence
        if (statusEscalationLevels.validation !== 'nothing') {
            if (result.validation.validationEnabled === true) {
                if (result.validation.tagFilterValid !== true || result.validation.objecttypeFilterValid !== true) {
                    statusResults.validation = statusEscalationLevels.validation;
                    statusMessages.push('Validation');
                    increaseStatus(statusEscalationLevels.validation);
                }
            }
        }

        // check purge for status-influence
        if (statusEscalationLevels.purge !== 'nothing') {
            if (result.purge.allowPurge === true || result.purge.allowPurgeStorage === true) {
                statusResults.purge = statusEscalationLevels.purge;
                statusMessages.push('Purge');
                increaseStatus(statusEscalationLevels.purge);
            }
        }

        // check loglevel for status-influence
        if (statusEscalationLevels.loglevel !== 'nothing') {
            if (result.logLevel === 'debug' || result.logLevel === 'trace') {
                statusResults.loglevel = statusEscalationLevels.loglevel;
                statusMessages.push('Loglevel');
                increaseStatus(statusEscalationLevels.loglevel);
            }
        }

        // check disabled-plugins for status-influence
        if (statusEscalationLevels.pluginsallenabled !== 'nothing') {
            if (result.pluginsAllEnabled == false) {
                statusResults.pluginsallenabled = statusEscalationLevels.pluginsallenabled;
                statusMessages.push('Disabled plugins');
                increaseStatus(statusEscalationLevels.pluginsallenabled);
            }
        }

        //result.statusResults = statusResults;

        if (statusMessages.length > 0) {
            result.statusmessage = 'Problems: ' + statusMessages.join(', ');
        }

        console.log(JSON.stringify(result, null, 2));
    }

    // Call the fetchData function
    fetchData();
});
