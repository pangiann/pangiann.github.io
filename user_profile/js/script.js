
function getUserInfo() {
    var raw = "";

    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };

    fetch("http://127.0.0.1:5000/user/pangiann", requestOptions)
    .then(response => response.text())
    .then(result =>{
        console.log(result);
        let json_obj = JSON.parse(result);
        
        var user_info = json_obj.user_info;
        document.getElementById("username").innerHTML = user_info[0].username;
        document.getElementById("name").innerHTML = user_info[0].last_name + " " + user_info[0].first_name;
        document.getElementById("email").innerHTML = user_info[0].email;
        document.getElementById("phone").innerHTML = user_info[0].phone;
        document.getElementById("address").innerHTML = user_info[0].address;

        var contract_info = json_obj.contract_info;
        if (contract_info.length!=0) {
            document.getElementById("provider").innerHTML = contract_info[0].supplier;
            document.getElementById("points").innerHTML = contract_info[0].points;
            document.getElementById("cost").innerHTML = contract_info[0].price + "$";


        }
        else {
            document.getElementById("provider").innerHTML = "NO CONTRACT YET?";
            document.getElementById("provider_text").innerHTML = "Say goodbye to pay-as-you-go pricing and complex invoices. InCharge is the monthly subscription solution that makes car charging even easier. Hit the \
                    Subscribe button to check all the various contracts made \
                    by our partners and check what fits your preferences";
            
            var newNode = document.createElement('div');
            newNode.className = 'button';
            newNode.innerHTML = "SUBSCRIBE";
            document.getElementById('card-text').appendChild(newNode);
            stats = document.querySelector('.card-stats');
            stats.classList.add('closed');
        
        }
        var car_info = json_obj.car_info;
        document.getElementById("car_name").innerHTML = car_info[0].brand;
        document.getElementById("model").innerHTML = car_info[0].model;
        document.getElementById("capacitance").innerHTML = car_info[0].capacitance + " kWh";

    
    
    
      })
    .catch(error => console.log('error', error));
}