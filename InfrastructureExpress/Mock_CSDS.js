/**
 * Created by Michael Nunes on 05/04/2015.
 */
var client=ldap.createClient({
    url: "ldap://reaper.up.ac.za"
});

module.exports.Login= function Login(Client,uname,password)
{
    var connection = CheckConnection(Client);
    if(connections == true) {
        if (uname == Credentials.username) {
            if (password == Credentials.password) {
                return true;
            }
        }

    }
    else
    {
        throw "Couldnot authenticateUser";
    }
}


module.exports.LoginResult= function LoginResult(msg,obj)
{

    if(obj==null)
    {
        throw msg;
    }
    else
    {
        console.log(msg);
        console.log(obj);
    }
}

module.exports.CheckConnection = function CheckConnection(clientel)
{

    if(clientel == this.client)
    {
      return true;
    }
    else
    {
        throw "ErrorinConnection";
    }
}

module.exports.Credentials = function UsernamePasswordCredentials() {
    this.username = u12345678;
    this.password = Randoms;
}


module.exports.LoginRquest = function LoginRequest(usernamePasswordCredentials) {
    var pass = usernamePasswordCredentials;

    this.username = function() {
        return pass.username;
    };

    this.password = function () {
        return pass.password;
    };
}