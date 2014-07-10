# Puppet


### Install puppet
```
wget http://apt.puppetlabs.com/puppetlabs-release-wheezy.deb
sudo dpkg -i puppetlabs-release-wheezy.deb
sudo apt-get update
sudo apt-get install puppet
```

### Clone repo
```
cd /etc
git clone git@github.com:CPAN-API/metacpan-puppet.git ./puppet
```

### Run puppet (note certname here)
```
cd /etc/puppet
puppet apply --verbose --show_diff --certname=metacpan-dev manifests/site.pp
```
