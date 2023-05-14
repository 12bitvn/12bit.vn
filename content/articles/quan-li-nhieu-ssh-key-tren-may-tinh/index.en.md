---
title: Manage multiple SSH keys on the same device
slug: manage-multiple-ssh-keys-on-the-same-device
date: 2022-08-23T09:15:46+07:00
authors:
  - tatthien
draft: false
tags:
  - gitlab
  - ssh
---

Today, I encountered a problem when adding an SSH key to a new Gitlab account. I tried to add the key, but it showed an error: `Fingerprint has already been taken`. This means that I have used this key for another Gitlab account. Gitlab does not allow using the same SSH key for multiple different accounts.

So I need to generate a new key and add it to my new account. However, how do I know which account I am cloning the repo from so that I don't get an authorization error?

## Generate a new key

First, we need to create a new SSH key and save it with a different name to avoid overlapping with the previous key. For example, `~/.ssh/id_rsd_company`.

```bash
ssh-keygen -t rsa -b 4096 -C "email@company.com"
```

{{% alert info %}}
Don't forget to add this key to your Gitlab account.
{{% /alert %}}

## Config

Now we need to add configuration in `~/.ssh/config`

```
# Company account
Host gitlab.company
  HostName gitlab.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_rsa_company

# Personal account
Host gitlab.personal
  HostName gitlab.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_rsa_personal
```

As you can see, we define a Host with the name `gitlab.company`, with parameters such as `HostName`, `IdentityFile` being the path to the newly created SSH key.

## Usage

Now when cloning repos from these two accounts, there will be a slight change in the URLs. Suppose we clone a repo named `demo` from the company account. The usual URL would be:

```bash
git@gitlab.com:username/demo.git
```

However, since we have reconfigured the host name for gitlab.com, the new URL will have to be:

```bash
git@gitlab.company:username/demo.git
```

In this way, `gitlab.company` will be resolved to `gitlab.com` and authenticated through the SSH key we just created.

Similarly, you also need to edit the URL for your personal account in the same way as in the `~/.ssh/config` file.
