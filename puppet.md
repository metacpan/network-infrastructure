# Puppet


### Install puppet
```
sudo apt-get install -y git
wget http://apt.puppetlabs.com/puppetlabs-release-wheezy.deb
sudo dpkg -i puppetlabs-release-wheezy.deb
sudo apt-get update
sudo apt-get install -y puppet
```

### Clone repo
```
cd /etc
mv puppet dpkg.puppet
git clone https://github.com/CPAN-API/metacpan-puppet.git ./puppet
```

### Run puppet (note certname here)
```
cd /etc/puppet
puppet apply --verbose --show_diff --certname=bm-mc-01 manifests/site.pp
```
