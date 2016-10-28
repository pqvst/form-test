# Garbled multipart/form-data boundary

I'm experiencing a very strange issue. I have a website with a form file upload (enctype="multipart/form-data"). When I upload **a specific file** the binary data received by the web server appears garbled (and is not parsed correctly).

### How to test:

1. Run the code, or visit:  
https://form-test-nevfrwpuhp.now.sh

2. Use this test image:  
![Test](https://raw.githubusercontent.com/pqvst/form-test/master/diagram.PNG)

3. Close Chrome and reopen it.

4. Attempt to upload the image multiple times.

5. When the issue occurs the first line will say "BAD".

### Expected behavior:

I expect the received data to look like this:

    ------WebKitFormBoundaryIO5U9KmGdVcqU50f
    Content-Disposition: form-data; name="file"; filename="diagram.PNG"
    Content-Type: image/png

### Actual behavior:

Sometimes (see below) the received data looks like this:

     b,°¹9B7VBoundaryvgktjweA3HNhX0M6
    Content-Disposition: form-data; name="file"; filename="diagram.PNG"
    Content-Type: image/png

Note that the hyphens and "WebKitForm" have been replaced by bytes that appear to be garbled. All the remaining content (besides the boundary identifier) is identical.

### Conclusions

* Able to reproduce when using HTTPS and HTTP/2

* Unable to test without HTTPS...

* Unable to reproduce when using HTTP/1

* I have only been able to reproduce the issue with a single file.

* If I save the file as a jpg instead it works fine. However, if I resave it as a PNG I can still reproduce the issue.

* I am unable to reproduce it with a different browser (only). However, if I trigger the issue in Chrome first, then the issue appears in IE as well.

* Unable to reproduce on a Mac with the same version of Chrome.

* Reproduced on two different Windows computers. Unable to reproduce on a third Windows computer.

* Reproduced from two different physical/network locations.

* It is not isolated to "tabs". I can reproduce by using the same tab and just re-entering the initial url (refreshing the page).

* I am not able to reproduce the issue locally on my dev machine. Locally I am using HTTP and HTTP/1. When testing in the hosted environment it is using HTTPS and HTTP/2.

* If I try to use Fiddler with HTTPS decryption I am unable to reproduce the issue. Fiddler essentially performs a man-in-the-middle attack by installing a root certificate that Fiddler can use to decrypt outgoing traffic. (And doesn't use HTTP/2?).
