function getGroups() {
    $.ajax({
        url: papi + '/api-management/1.0/api-groups',
        headers: {
        'Content-Type' : 'application/x-www-form-urlencoded'
        },
        type: 'GET',
        data: 'status=ENABLED',          
        error: function(err){ 
        console.log('Erro ao obter GRUPOS: ' + JSON.stringify(err));
        },
        success:  function(res){ 
        console.log('Grupos obtidos!');
        //$("#apis").attr('disabled', true);
            var i = 0;
            $("#groups").append('<option value="all">Todas</option>');
            $.each(res,function(){
                $("#groups").append('<option value=' + res[i]['uuid'] + '>' + res[i]['name'] + '</option>');
                i++;
            });
            $('#groups').trigger("chosen:updated");
            //$('#apis').trigger("chosen:updated");
        }
    });
}

function getAPIs(group) {
    $.ajax({
        url: papi + '/api-management/1.0/api-groups/' + group + '/apis',
        headers: {
        'Content-Type' : 'application/x-www-form-urlencoded'
        },
        type: 'GET',   
        error: function(err){ 
        console.log('Erro ao obter APIs: ' + JSON.stringify(err));
        },
        success:  function(res){ 
        console.log('APIs obtidas! '  + JSON.stringify(res));
        $("#apis").attr('disabled', false);
            var i = 0;
            $("#apis").append('<option></option>');
            $.each(res,function(){
                var uuid = res[i]['uuid'];
                console.log ('API UUID: ' + uuid);
                detalhaAPI(uuid);
                i++;
            });
            
        }
    });
}

function getAllAPIs() {
    $.ajax({
        url: papi + '/Apis?PortalStatus=ENABLED&AccessStatus=PUBLIC',
        headers: {
        'Content-Type' : 'application/x-www-form-urlencoded'
        },
        type: 'GET',   
        error: function(err){ 
            console.log('Erro ao obter APIs: ' + JSON.stringify(err));
        },
        success:  function(res){ 
            console.log('APIs obtidas! '  + JSON.stringify(res));
            $("#apis").attr('disabled', false);
            var i = 0;
            $("#apis").append('<option></option>');
            $.each(res,function(){
                if (res[i]['AccessStatus'] == 'PUBLIC' && res[i]['PortalStatus'] == 'ENABLED'){
                    $("#apis").append('<option value=' + res[i]['Uuid'] + '>' + res[i]['Name'] + '</option>');
                    $('#apis').trigger("chosen:updated");
                }
                i++;
            });
        }
    });
}

function detalhaAPI(uuid) {
    $.ajax({
        url: papi + '/api-management/1.0/apis/' + uuid,
        headers: {
        'Content-Type' : 'application/x-www-form-urlencoded'
        },
        type: 'GET',   
        error: function(err){ 
        console.log('Erro ao obter dados da API: ' + JSON.stringify(err));
        },
        success:  function(res){
            console.log('Dados da API obtidos.');
            $("#apis").append('<option></option>');
            if (res['accessStatus'] == 'PUBLIC' && res['portalStatus'] == 'ENABLED'){
                $("#apis").append('<option value=' + res['uuid'] + '>' + res['name'] + '</option>');
                $('#apis').trigger("chosen:updated");  
            }
        }
    });
}

function getSwagger(uuid) {
    $.ajax({
        url: papi + '/Apis(\'' + uuid + '\')/SpecContent',
        type:  'GET',
        error: function(){ 
        console.log('Erro ao obter Swagger.');
        },
        success:  function(swaggerJson){ 
        console.log('Swagger obtido!');
        Redoc.init(swaggerJson, {
            scrollYOffset: 0
        }, document.getElementById('redoc-container'));
        }
    });
}