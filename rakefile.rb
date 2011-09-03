require 'rake'
# closure-compiler is from Document Cloud.
# To install: sudo gem install closure-compiler
require 'closure-compiler'

task :default => :compress

task :compress do
	File.open 'comboEditable.js', 'r' do |f|
		compressed = Closure::Compiler.new.compile f.read()
		File.open 'comboEditable.min.js', 'w' do |out| 
			out.write compressed
		end
	end
end
