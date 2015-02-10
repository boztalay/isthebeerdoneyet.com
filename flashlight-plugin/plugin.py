def results(fields, original_query):
    html = """
    <script language="javascript" type="text/javascript">
        setTimeout(function() {
            window.location = 'http://isthebeerdoneyet.com/simple/simple.html'
        }, 500);
    </script>
    """
    return {
        "title": "Is the Beer Done Yet?",
        "run_args": [],
        "html": html
    }

def run():
    return
