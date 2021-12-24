# EIdApp
## Initialisation

### Mise en place de la VM et des outils nécessaires
```bash
sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
sudo apt-get install docker docker-compose
sudo usermod -a -G docker $USER
sudo apt-get install pip
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 68DB5E88
sudo add-apt-repository "deb https://repo.sovrin.org/sdk/deb bionic master"
sudo apt-get update
sudo apt-get install -y libindy
sudo apt install python3-pip
pip3 install aries-cloudagent
pip install python3-indy
pip install pytest-xdist
```
Une fois les commandes ci-dessus exécutées, il est nécessaire de redémarrer la VM.

### Mise en place de von-network
1. Clone du projet
```bash
git clone https://github.com/bcgov/von-network.git
```
3. Build et démarrage
```bash
cd von-network/
sudo ./manage build
sudo ./manage start --logs
```
4. Von-network est visible à l'adresse : http://0.0.0.0:9000

### Enregistrement de la confédération
```bash
curl -X POST "http://localhost:9000/register" -d '{"seed": "Conf0000000000000000000000000001", "role": "TRUST_ANCHOR", "alias": "Confederation"}'
```

### Lancer l'agent de la confédération
```bash
aca-py start --label Conf -it http 0.0.0.0 8000 -ot http --admin 0.0.0.0 11000 --admin-insecure-mode --genesis-url http://localhost:9000/genesis --seed Conf0000000000000000000000000001 --endpoint http://localhost:8000/ --debug-connections --auto-provision --wallet-type indy --wallet-name Conf1 --wallet-key secret
```

### Lancer l'agent bob
```bash
aca-py start --label Bob -it http 0.0.0.0 8001 -ot http --admin 0.0.0.0 11001 --admin-insecure-mode --endpoint http://localhost:8001/ --genesis-url http://localhost:9000/genesis --debug-connections --auto-provision --wallet-local-did --wallet-type indy --wallet-name Bob1 --wallet-key secret
```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
