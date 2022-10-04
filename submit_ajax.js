(function($){
    'use strict';

    $.fn.submitAjax = function(param = {pre : null, success : null, pasca : null, error : null}){

        $(this).on('submit', function(e){
            var _url        = $(this).attr('action');
            var _method     = $(this).attr('method'); 
            var _formData   = $(this).getFormData(); 

            if(typeof param.pre == 'function'){
                param.pre();
            }

            $.ajax({
                url: _url,
                type: _method,
                data: _formData,
                dataType: 'text',
                async: true,
                processData: false,
                contentType: false,
                enctype: 'multipart/form-data',
                success: (response, status, xhr)=>{
                    if(typeof param.success == 'function'){ 
                        param.success(response, status);
                    }
                    if(typeof param.pasca == 'function'){
                        param.pasca();
                    }
                },
                error: (xhr, status, errThrow)=>{
                    if(typeof param.error == 'function'){
                        param.error(xhr, status);
                    }
                    if(typeof param.pasca == 'function'){
                        param.pasca();
                    }
                } 
            });

            return false;
        });
    };

    $.fn.getFormData = function(){
        var formData = new FormData();
        var form = $(this);
        form.find('*').filter(':input').each(function(i,o){
            if(o.type === 'file'){
                var file = $(o)[0].files[0];
                formData.append(o.name, file);
            }else if(o.type === 'checkbox' || o.type === 'radio'){
                if(o.checked === true){
                    formData.append( o.name, o.value);
                }
            }else{
                if($(o).data('widget') === 'price'){
                    console.log('price ' + $(o).unmask());
                    formData.append(o.name, $(o).unmask());
                }else {
                    formData.append(o.name, o.value);
                }
            }

        });

        return formData;
    };

})(jQuery);