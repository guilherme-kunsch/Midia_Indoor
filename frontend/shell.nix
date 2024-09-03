{pkgs ? import <nixpkgs> {}}:


with pkgs;

mkShell {
	name = "ipiranga";
	buildInputs = [readline nodejs_21];
	shellHook = ''
	echo "Hello"
'';
}
