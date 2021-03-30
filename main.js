$(document).ready(function() {

			$('.modal').modal();	

			$.getJSON('read.php', function(json) {
				var tr=[];
				for (var i = 0; i < json.length; i++) {
					tr.push('<tr class="showModal" id="'+json[i].id+'"">');
					tr.push('<td>' + json[i].fullname + '</td>');
					tr.push('<td>' + json[i].referral_code + '</td>');
					tr.push('<td>' + json[i].prefix + '</td>');
					tr.push('<td><a class="waves-effect waves-light btn modal-trigger" href="#modal2">Edit</a>&nbsp;&nbsp;<button class=\'delete\' id=' + json[i].id + '>Delete</button></td>');
					tr.push('</tr>');
				}
				$('table').append($(tr.join('')));
				$('.showModal').click(function(){
					var id = $(this).attr('id');
					console.log("id : " + id);

					$('modal2').modal('open');
					var tr=[];
			          $.ajax({
			            url: "fetch_single.php",
			            method: "POST",
			            data:{id:id},
			            dataType: "json",
			            success:function(data){
			            	var item = data;
			            	 tr.push('<tr>');
				              tr.push('<td class="left-align valign-wrapper grey-text text-darken-5"><i class="material-icons text-grey right-align">badge</i>&nbsp;&nbsp;&nbsp;fullname</td>');
				              tr.push('<td class="center-align">:</td>');
				              tr.push('<td class="left-align username">'+item.fullname+'</td>');
				              tr.push('<td></td>');
				              tr.push('</tr>');
				              tr.push('<tr>');
				              tr.push('<td class="left-align valign-wrapper grey-text text-darken-5"><i class="material-icons text-grey right-align">person</i>&nbsp;&nbsp;&nbsp;Referral Code</td>');
				              tr.push('<td class="center-align">:</td>');
				              tr.push('<td class="left-align username">'+item.referral_code+'</td>');
				              tr.push('<td><button class="edit1 btn-floating grey lighten-1" id="'+item.id+'"  ><i class="material-icons" >drive_file_rename_outline</i></button></td>');
				              tr.push('</tr>');
				              tr.push('<tr>');
				              tr.push('<td class="left-align valign-wrapper grey-text text-darken-5"><i class="material-icons text-grey right-align">prefix</i>&nbsp;&nbsp;&nbsp;Prefix</td>');
				              tr.push('<td class="center-align">:</td>');
				              tr.push('<td class="left-align prefix">'+item.prefix+'</td>');
				              tr.push('<td><button class="edit2 btn-floating grey lighten-1" id="'+item.id+'"><i class="material-icons" >drive_file_rename_outline</i></button></td>');
				              tr.push('</tr>');

				              $('.tbodymodal2').html($(tr.join('')));
				            }
			          });

				});
			});
			
			$(document).delegate('#addNew', 'click', function(event) {
				event.preventDefault();
				
				var fullname = $('#name').val();
				var referral_code =$('#referral_code').val();
				var prefix=$('#prefix').val();
				
				if(fullname == null || fullname == "") {
					alert("Company Name is required");
					return;
				}

				if(referral_code == null || referral_code == "") {
					alert("referral code Name is required");
						
				}

				if(prefix == null || prefix == "") {
					alert("prefix code is required");
					return;
				}


				
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8",
					url: "create.php",
					data: JSON.stringify({'fullname': fullname,'referral_code':referral_code,'prefix':prefix}),
					cache: false,
					success: function(result) {
						console.log(result);
						alert('Company added successfully');
						location.reload(true);
					},
					error: function(err) {
						alert(err);
					}
				});
			});
			
			$(document).delegate('.delete', 'click', function() { 
				if (confirm('Do you really want to delete record?')) {
					var id = $(this).attr('id');
					var parent = $(this).parent().parent();
					$.ajax({
						type: "DELETE",
						url: "delete.php?id=" + id,
						cache: false,
						success: function() {
							parent.fadeOut('slow', function() {
								$(this).remove();
							});
							location.reload(true)
						},
						error: function() {
							alert('Error deleting record');
						}
					});
				}
			});

			/*-------------------*/




			$(document).delegate('.edit', 'click', function() {
				$('#modal2').modal();
				 var parent = $(this).parent().parent();
                	var id = $(this).attr('id');

				var fullname = parent.children("td:nth-child(2)");
				var buttons = parent.children("td:nth-child(3)");
				
				fullname.html("<input type='text' id='txtName' value='" + fullname.html() + "'/>");
				buttons.html("<button id='save'>Save</button>&nbsp;&nbsp;<button class='delete' data-target='#modal2' id='modal" + id.html() + "'>Delete</button>");
				});



			$(document).delegate('.edit1', 'click', function() {
				$('#modal2').modal();
				  var parent = $(this).parent().parent();
                	var id = $(this).attr('id');

                	console.log(id);

				var referral_code =parent.children("td:nth-child(2)");
				var buttons = parent.children("td:nth-child(3)");
				
				
				referral_code.html("<input type='text' id='txtName' value='" + referral_code.html() + "'/>");
				buttons.html("<button id='save1'>Save</button>&nbsp;&nbsp;<button class='delete' data-target='#modal2' id='modal" + id.html() + "'>Delete</button>");
			});

			$(document).delegate('.edit2', 'click', function() {
				$('#modal2').modal();
				 var parent = $(this).parent().parent();
                	var id = $(this).attr('id');
				
				
				var prefix = parent.children("td:nth-child(2)");
				var buttons = parent.children("td:nth-child(3)");
				
				prefix.html("<input type ='text' id = txtName' value='" + prefix.html() + "'/>");
				buttons.html("<button id='save2'>Save</button>&nbsp;&nbsp;<button class='delete' data-target='#modal2' id='modal" + id.html() + "'>Delete</button>");
			});

			/*-----------*/
			
			$(document).delegate('#save', 'click', function() {
				var parent = $(this).parent().parent();
				var id = $(this).attr('id');
			
				
				var fullname = parent.children("td:nth-child(2)");
				var buttons = parent.children("td:nth-child(3)");

				
				$.ajax({
					type: "PUT",
					contentType: "application/json; charset=utf-8",
					url: "update.php",
					data: JSON.stringify({'id' : id.html(), 'fullname' : fullname.children("input[type=text]").val()}),
					cache: false,
					success: function() {
						fullname.html(fullname.children("input[type=text]").val());
						buttons.html("<button class='edit' id='" + id.html() + "'>Edit</button>&nbsp;&nbsp;<button class='delete' data-target='#modal2' id='modal2 id='" + id.html() + "'>Delete</button>");
					},
					error: function() {
						alert('Error updating record');
					}
				});
			});

			$(document).delegate('#save1', 'click', function() {
				var parent = $(this).parent().parent();
				var id = $(this).attr('id');

				var referral_code = parent.children("td:nth-child(2)");
				var buttons = parent.children("td:nth-child(3)");
				
				$.ajax({
					type: "PUT",
					contentType: "application/json; charset=utf-8",
					url: "update.php",
					data: JSON.stringify({'id' : id.html(),  'referral_code' : referral_code.children("input[type=text]").val()}),
					cache: false,
					success: function() {
						referral_code.html(referral_code.children("input[type=text]").val());
						buttons.html("<button class='edit1' id='" + id.html() + "'>Edit</button>&nbsp;&nbsp;<button class='delete' data-target='#modal2' id='modal2 id='" + id.html() + "'>Delete</button>");
					},
					error: function() {
						alert('Error updating record');
					}
				});
			});

			$(document).delegate('#save2', 'click', function() {
				
					
				var prefix = parent.children("td:nth-child(2)");
				var buttons = parent.children("td:nth-child(3)");
				
				$.ajax({
					type: "PUT",
					contentType: "application/json; charset=utf-8",
					url: "update.php",
					data: JSON.stringify({'id' : id.html(), 'prefix' : prefix.children("input[type=text]").val()}),
					cache: false,
					success: function() {
						prefix.html(prefix.children("input[type=text]").val());
						buttons.html("<button class='edit2' id='" + id.html() + "'>Edit</button>&nbsp;&nbsp;<button class='delete' data-target='#modal2' id='modal2 id='" + id.html() + "'>Delete</button>");
					},
					error: function() {
						alert('Error updating record');
					}
				});
			});

		});